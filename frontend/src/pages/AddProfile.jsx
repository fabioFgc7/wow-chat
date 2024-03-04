import { Link } from "react-router-dom";

const AddProfile = () => {
  return (
    <div className='w-full flex gap-3 items-center justify-center'>
      <Link to={`/chat`}>Omitir</Link>
      <Link to={`/avatar`}>Add</Link>
    </div>
  );
};

export default AddProfile;
