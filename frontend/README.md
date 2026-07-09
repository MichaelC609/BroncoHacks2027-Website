# BroncoHacks 2027 Frontend

## Frontend Route Map

| Route | Purpose |
|---|---|
| `/` | Home page for the BroncoHacks 2027 portal |
| `/teams` | Browse and filter available hackathon teams |
| `/teams/[teamId]` | View team details, members, and join/leave actions |
| `/profiles/[userId]` | View a public participant profile |

---

## Expected Data Contracts

### Team Summary

Used by the Teams page.

```ts
type TeamSummary = {
  id: string;
  name: string;
  hackathon: string;
  members: number;
  maxMembers: number;
  lookingFor: string;
};
```

### Team Detail

Used by the Team Details page.

```ts
type TeamDetail = {
  id: string;
  name: string;
  description: string;
  hackathon: string;
  members: TeamMember[];
  lookingFor: string;
};
```

### Team Member

```ts
type TeamMember = {
  id: string;
  name: string;
};
```

### User Profile

Used by the Profile page.

```ts
type UserProfile = {
  id: string;
  name: string;
  username: string;
  school: string;
  major: string;
  bio: string;
  skills: string[];
};
```

---

## Current Frontend Features

- Browse available teams
- Search teams by name
- Filter open teams
- Sort teams by member count or name
- View team details
- View member profiles
- Join a team
- Leave a team
- Restrict users to one team at a time
- Persist team membership using localStorage

---

## Loading, Empty, and Error States

### Teams Page

- Loading placeholder
- Empty search result placeholder

### Team Details Page

- Loading placeholder
- Team not found error state

### Profile Page

- User not found error state

---

## Testing Coverage

Current automated tests verify:

- Home page renders
- Teams page renders
- Team member counts update from localStorage
- Team details page renders
- Team member IDs are unique within a team
- Team member IDs are unique across teams
- Users can only join one team at a time

## Auth UX and Error Handling Notes

The sign-in and sign-up pages use shared auth form components from `app/(auth)/auth`.

### Shared Auth Components

- `AuthCard` provides the shared page/card layout.
- `AuthInput` provides consistent labels, inputs, and field-level error display.
- `AuthSubmitButton` provides consistent submit button behavior.

### Validation Model

Validation is handled through shared helper functions in `app/(auth)/auth/validation.ts`.

Current validation rules:

- Email is required.
- Email must include `@`.
- Password is required.
- Password must be at least 8 characters.
- Sign-up also requires a name.

### Submit Lifecycle States

Auth forms use a typed submit lifecycle:

```ts
type SubmitState = "idle" | "submitting" | "success" | "error";