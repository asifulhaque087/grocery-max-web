import { useField, ErrorMessage } from "formik";

const AauthTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField<{}>(props);

  // const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div className="flex flex-wrap">
      <div className="relative w-full appearance-none label-floating">
        <input
          className={`tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full
           bg-gray-900
            rounded focus:outline-none focus:bg-white focus:border-gray-500  
           ${meta.touched && meta.error && "border border-red-500"}`}
          {...field}
          {...props}
        />
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-500"
      />
    </div>
  );
};

export default AauthTextField;

// return (
//   <div className="flex flex-wrap">
//     <div className="relative w-full appearance-none label-floating">
//       <input
//         className={`tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full bg-gray-200
//          border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500
//          ${meta.touched && meta.error && "border border-red-500"}`}
//         {...field}
//         {...props}
//       />
//     </div>
//     <ErrorMessage
//       component="div"
//       name={field.name}
//       className="text-red-500"
//     />
//   </div>
// );
