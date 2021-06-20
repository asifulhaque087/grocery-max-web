import { useField, ErrorMessage } from "formik";

const ATextField = ({ label, ...props }: any) => {
  const [field, meta] = useField<{}>(props);

  // const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <div>
      <div className="my-3">
        <label
          htmlFor={label.replace(/ /g, "")}
          className="py-2 block capitalize"
        >
          {label}
        </label>
        <div className="mb-3s pt-0">
          <input
            className={`px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white  rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full border ${
              meta.touched && meta.error && " border-red-500"
            }`}
            {...field}
            {...props}
          />
        </div>
      </div>
      <ErrorMessage
        component="div"
        name={field.name}
        className="text-red-500"
      />
    </div>
  );

  //   return (
  //     <div className="flex flex-wrap">
  //       <div className="relative w-full appearance-none label-floating">
  //         <input
  //           className={`tracking-wide py-2 px-4 leading-relaxed appearance-none block w-full
  //            bg-gray-900
  //             rounded focus:outline-none focus:bg-white focus:border-gray-500
  //            ${meta.touched && meta.error && "border border-red-500"}`}
  //           {...field}
  //           {...props}
  //         />
  //       </div>
  // <ErrorMessage
  //   component="div"
  //   name={field.name}
  //   className="text-red-500"
  // />
  //     </div>
  //   );
};

export default ATextField;
