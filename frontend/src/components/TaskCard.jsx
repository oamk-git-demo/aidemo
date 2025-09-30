function TaskCard({ task }) {
  return (
    <div className={`task-card ${task.is_completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="task-meta">
        <span className={`status ${task.is_completed ? 'completed' : 'pending'}`}>
          {task.is_completed ? '✓ Completed' : '⏳ Pending'}
        </span>
        <span className="created-at">
          Created: {new Date(task.created_at).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
