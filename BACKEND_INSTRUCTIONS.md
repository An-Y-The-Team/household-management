# Household Management Backend Project

Welcome! In this project, you will be building the backend API for a comprehensive Household Management platform. The frontend has already been built and is currently running on mocked data. Your job is to implement a robust, production-ready backend that the frontend will consume.

## 🎯 Project Overview

This application helps multiple users manage shared households. Features include:

- **Dashboard:** Aggregated metrics (spending, active tasks, upcoming payments).
- **Tasks:** A gamified chore tracker with recurring tasks, point values, and sub-tasks.
- **Users & Households:** Management of household members, roles (admin/member), and invite flows.
- **Subscriptions:** Shared tracking of household utilities and personal subscriptions.
- **Chats:** Direct and household group messaging.

## 📐 Architecture & Principles

You must follow these strict backend development principles when writing your code.

### 1. Feature Package Structure

Avoid dumping all models into `models.py` or all routes into `routes.py`. Wrap each feature in its own package.

```text
app/
  main.py                     # FastAPI app, middleware, router registration
  core/
    config.py                 # Settings
    database.py               # Engine, get_session dependency
  tasks/                      # 👈 Example Feature Package
    router.py                 # APIRouter — thin HTTP layer
    service.py                # Business logic, DB operations (no FastAPI imports)
    models.py                 # SQLModel table models
    schemas.py                # Pydantic request/response models
    constants.py              # Enums, default values, magic numbers
```

### 2. Use Enums, Not Strings

**Never** use raw strings for fields with a closed set of valid values (e.g., status, priority). Define an `Enum` (specifically `StrEnum`) in the feature's `constants.py` file and reference it in your models and schemas.

```python
# app/tasks/constants.py
from enum import StrEnum

class TaskStatus(StrEnum):
    TODO = "todo"
    IN_PROGRESS = "in_progress"
    DONE = "done"
```

### 3. Thin Routers & Robust Services

- **Routers (`router.py`)**: Should only parse input, inject dependencies, call a service function, and return the Pydantic response.
- **Services (`service.py`)**: Should contain all business logic. If a function takes more than 3 parameters, use a Pydantic model or Dataclass for the input.
- Keep dependency injection (`Depends`) in the router. Pass the DB session explicitly to the service functions.

### 4. Async I/O Everywhere

- Use `async def` for all your endpoints.
- Use an async database driver (e.g., `asyncpg` for PostgreSQL).
- Do not `await` operations sequentially in a `for` loop if they are independent. Use `asyncio.gather()` to run them concurrently.
- Never block the event loop with synchronous I/O (`requests`, `time.sleep`). Use `httpx.AsyncClient` for outbound requests.

## 🗄️ Core Data Entities

Based on the frontend contracts, you will need to design relational tables for the following entities:

1. **Household**: `id`, `name`, `created_at`
2. **User**: `id`, `email`, `name`, `global_role`, `points`
3. **HouseholdMember**: Junction table mapping Users to Households with a specific role (`admin`, `member`, `viewer`).
4. **Task**: `id`, `household_id`, `assignee_id`, `title`, `description`, `status`, `priority`, `category`, `points`, `due_date`.
5. **SubTask**: `id`, `task_id`, `title`, `completed`.
6. **Subscription**: `id`, `household_id`, `owner_id`, `name`, `amount`, `currency`, `billing_cycle`, `status`, `next_renewal_date`.
7. **PaymentHistory**: `id`, `subscription_id`, `date`, `amount`, `status`.
8. **Conversation** & **Message**: Tables for group and direct chats.

> **Tip:** You can inspect the frontend files in `frontend/src/features/*/types.ts` to see the exact TypeScript interfaces your API will need to satisfy.

## 🚀 Implementation Phases

We recommend building the backend in these progressive phases:

### Phase 1: Core Setup & Households

- Initialize the FastAPI app and SQLModel async database connection.
- Create the `households` and `users` feature packages.
- Implement CRUD endpoints for creating a Household and inviting Users.

### Phase 2: Tasks & Gamification

- Create the `tasks` feature package.
- Implement the `Task` and `SubTask` models.
- Build endpoints to list, create, update, and delete tasks.
- *Challenge:* Implement the logic to award points to a user when a task is marked as `done`.

### Phase 3: Subscriptions Tracking

- Create the `subscriptions` feature package.
- Ensure you use `StrEnum` for `BillingCycle` (monthly, yearly) and `SubscriptionStatus`.
- Implement endpoints to calculate monthly and yearly spend metrics for the dashboard.

### Phase 4: Chat APIs

- Create the `chats` feature package.
- Implement HTTP endpoints to fetch conversations and message history.
- *Bonus:* Implement a WebSocket endpoint for real-time message delivery.

## ✅ Evaluation Criteria

Your code will be evaluated on:

1. **Type Safety:** Strict type hints (`mypy --strict`). No bare `Any`.
2. **Architecture:** Clean separation of concerns (Routers vs. Services).
3. **Performance:** Proper use of `asyncio.gather` and avoiding N+1 query problems in SQLModel.
4. **Code Quality:** Organized imports (`ruff`), clear constants extraction, and descriptive error handling (`HTTPException`).

Good luck! Start by exploring the frontend mocks to understand the expected JSON payloads.
