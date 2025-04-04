import { vi } from "vitest";

export function JobRepositoryMock() {
  return {
    create: vi.fn(),
    list: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    findOne: vi.fn()
  }
}
