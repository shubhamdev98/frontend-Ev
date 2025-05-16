
const Divider = ({ text }) => {
  return (
    <div className="relative my-6">
   
      <div className="relative flex justify-center text-xs uppercase">
        <span className="px-2  text-background-light/60">{text}</span>
      </div>
    </div>
  );
};

export default Divider;