export const StatusButton = ({ label, color, ...props }) => {
  return (
    <button className="w-full rounded-[4px] mt-2 h-[60px] p-3" style={{ backgroundColor: color }}  {...props}>
      <p className="text-xl">{label}</p>
    </button>
  )
};