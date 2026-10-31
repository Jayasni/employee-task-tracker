
function StatCard({ title, value, icon: Icon, color, description }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:bg-panel-hover">

      {/* Card header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted">
          {title}
        </p>

        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
          {Icon && <Icon size={21} />}
        </div>
      </div>

      {/* Value */}
      <h3 className="mt-5 text-3xl font-bold text-main-text">
        {value}
      </h3>

      {/* Description */}
      <p className="mt-2 text-xs text-muted">
        {description}
      </p>

    </div>
  );
}

export default StatCard;
