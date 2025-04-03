import { vi } from "vitest";

export const JobRepositoryMock = {
  create: vi.fn(),
  list: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  findOne: vi.fn()
}
