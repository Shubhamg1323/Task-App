import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SortableTaskItem } from '../SortableTaskItem';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: jest.fn().mockReturnValue({
    attributes: { 'data-testid': 'sortable' },
    listeners: { onPointerDown: jest.fn() },
    setNodeRef: jest.fn(),
    transform: null,
    transition: null,
  }),
}));

jest.mock('../TaskItem', () => ({
  TaskItem: ({ task }: any) => (
    <div data-testid="task-item">{task.text}</div>
  ),
}));

const createTask = () => ({
  id: '1',
  text: 'Test task',
  completed: false,
  time: '10:00',
});

describe('SortableTaskItem', () => {
  it('renders TaskItem with provided task text', () => {
    const task = createTask();

    render(
      <SortableTaskItem
        task={task}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    expect(screen.getByTestId('task-item')).toHaveTextContent('Test task');
  });

  it('applies sortable attributes to wrapper div', () => {
    const task = createTask();

    render(
      <SortableTaskItem
        task={task}
        onToggle={jest.fn()}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );

    expect(screen.getByTestId('sortable')).toBeInTheDocument();
  });
});
