<template>
  <div class="md:flex md:items-center md:justify-between">
    <div class="flex-1 min-w-0">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <div v-if="!create">
            <IssueStatusIcon
              :issue-status="issue.status"
              :task-status="activeTask(issue.pipeline).status"
            />
          </div>
          <BBTextField
            class="my-px px-2 flex-1 text-lg font-bold truncate"
            :class="[create && '-ml-2']"
            :disabled="!allowEditNameAndDescription"
            :required="true"
            :focus-on-mount="create"
            :bordered="false"
            :value="state.name"
            :placeholder="'Issue name'"
            @end-editing="(text: string) => trySaveName(text)"
          />

          <div class="mt-4 flex space-x-3 md:mt-0 md:ml-4">
            <IssueReviewButtonGroup v-if="showReviewButton" />
            <IssueStatusTransitionButtonGroup v-else-if="showRolloutButton" />
          </div>
        </div>
        <div v-if="!create">
          <i18n-t
            keypath="issue.opened-by-at"
            tag="p"
            class="text-sm text-control-light"
          >
            <template #creator>
              <router-link
                :to="`/u/${issue.creator.id}`"
                class="font-medium text-control hover:underline"
                >{{ issue.creator.name }}</router-link
              >
            </template>
            <template #time>{{
              dayjs(issue.updatedTs * 1000).format("LLL")
            }}</template>
          </i18n-t>
          <p
            v-if="pushEvent"
            class="mt-1 text-sm text-control-light flex flex-row items-center space-x-1"
          >
            <template v-if="pushEvent.vcsType.startsWith('GITLAB')">
              <img class="h-4 w-auto" src="../../assets/gitlab-logo.svg" />
            </template>
            <template v-else-if="pushEvent.vcsType.startsWith('GITHUB')">
              <img class="h-4 w-auto" src="../../assets/github-logo.svg" />
            </template>
            <template v-else-if="pushEvent.vcsType.startsWith('BITBUCKET')">
              <img class="h-4 w-auto" src="../../assets/bitbucket-logo.svg" />
            </template>
            <a :href="vcsBranchUrl" target="_blank" class="normal-link">{{
              `${vcsBranch}@${pushEvent.repositoryFullPath}`
            }}</a>

            <i18n-t
              v-if="commit && commit.id && commit.url"
              keypath="issue.commit-by-at"
              tag="span"
            >
              <template #id>
                <a :href="commit.url" target="_blank" class="normal-link"
                  >{{ commit.id.substring(0, 7) }}:</a
                >
              </template>
              <template #title>
                <span class="text-main">{{ commit.title }}</span>
              </template>
              <template #author>{{ pushEvent.authorName }}</template>
              <template #time>{{
                dayjs(commit.createdTs * 1000).format("LLL")
              }}</template>
            </i18n-t>
          </p>
        </div>
        <IssueRollbackFromTips />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch, computed, Ref } from "vue";
import { head } from "lodash-es";

import IssueStatusIcon from "./IssueStatusIcon.vue";
import IssueRollbackFromTips from "./IssueRollbackFromTips.vue";
import { activeTask } from "@/utils";
import {
  TaskDatabaseSchemaUpdatePayload,
  TaskDatabaseDataUpdatePayload,
  Issue,
  VCSPushEvent,
} from "@/types";
import { useExtraIssueLogic, useIssueLogic } from "./logic";
import IssueStatusTransitionButtonGroup from "./IssueStatusTransitionButtonGroup.vue";
import { IssueReviewButtonGroup } from "./review";
import { useIssueReviewContext } from "@/plugins/issue/logic/review/context";

interface LocalState {
  editing: boolean;
  name: string;
}

const logic = useIssueLogic();
const create = logic.create;
const issue = logic.issue as Ref<Issue>;
const { allowEditNameAndDescription, updateName } = useExtraIssueLogic();
const issueReview = useIssueReviewContext();
const { done: reviewDone, error: reviewError } = issueReview;

const state = reactive<LocalState>({
  editing: false,
  name: issue.value.name,
});

const showReviewButton = computed(() => {
  if (create.value) return false;
  if (reviewError.value) return false;
  return !reviewDone.value;
});

const showRolloutButton = computed(() => {
  if (create.value) return true;

  return reviewDone.value;
});

watch(
  () => issue.value,
  (curIssue) => {
    state.name = curIssue.name;
  }
);

const pushEvent = computed((): VCSPushEvent | undefined => {
  if (issue.value.type == "bb.issue.database.schema.update") {
    const payload = activeTask(issue.value.pipeline)
      .payload as TaskDatabaseSchemaUpdatePayload;
    return payload?.pushEvent;
  } else if (issue.value.type == "bb.issue.database.data.update") {
    const payload = activeTask(issue.value.pipeline)
      .payload as TaskDatabaseDataUpdatePayload;
    return payload?.pushEvent;
  }
  return undefined;
});

const commit = computed(() => {
  // Use commits[0] for new format
  // Use fileCommit for legacy data (if possible)
  // Use undefined otherwise
  return head(pushEvent.value?.commits) ?? pushEvent.value?.fileCommit;
});

const vcsBranch = computed((): string => {
  if (pushEvent.value) {
    return pushEvent.value.ref.replace(/^refs\/heads\//g, "");
  }
  return "";
});

const vcsBranchUrl = computed((): string => {
  if (pushEvent.value) {
    if (pushEvent.value.vcsType == "GITLAB") {
      return `${pushEvent.value.repositoryUrl}/-/tree/${vcsBranch.value}`;
    } else if (pushEvent.value.vcsType == "GITHUB") {
      return `${pushEvent.value.repositoryUrl}/tree/${vcsBranch.value}`;
    } else if (pushEvent.value.vcsType == "BITBUCKET") {
      return `${pushEvent.value.repositoryUrl}/src/${vcsBranch.value}`;
    }
  }
  return "";
});

const trySaveName = (text: string) => {
  state.name = text;
  if (text != issue.value.name) {
    updateName(state.name);
  }
};
</script>
