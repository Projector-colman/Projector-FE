export enum IssueStatus {
  ToDo = 'to-do',
  InProgress = 'in-progress',
  Verify = 'verify',
  Done = 'done',
  None = 'none',
}

export const IssueStatusLabel: { [key in IssueStatus]: string } = {
  [IssueStatus.ToDo]: "To Do",
  [IssueStatus.InProgress]: "In Progress",
  [IssueStatus.Verify]: "Verify",
  [IssueStatus.Done]: "Done",
  [IssueStatus.None]: "None"
};
