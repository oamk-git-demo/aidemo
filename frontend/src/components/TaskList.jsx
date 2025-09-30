import TaskCard from './TaskCard';

function TaskList({ tasks }) {
  if (!tasks.length) return <p>No tasks found</p>;
  return (
    <div className="tasks-list">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
