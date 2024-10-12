import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TaskList from "../components/TaskList";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test("renders TaskList with tasks", () => {
  const tasks = [
    { id: 1, title: "Test Task 1", description: "Description 1" },
    { id: 2, title: "Test Task 2", description: "Description 2" },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  render(
    <TaskList
      tasks={tasks}
      onEdit={mockOnEdit}
      onDelete={mockOnDelete}
    />
  );

  const taskElement = screen.getByText(/Test Task 1/i);
  expect(taskElement).toBeInTheDocument();
});
