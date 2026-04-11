"use client";
// import AppCheckBoxFormik from "@/component/CheckBox/AppCheckBoxFormik";
import { useToast } from "@/components/AppToast";
import AppButton from "@/components/button/AppButton";
import AppInputFormik from "@/components/input/AppInputFormik";
import { Form, Formik } from "formik";
import { CgPassword } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import * as Yup from "yup";

const FormField = () => {
  const toast = useToast();
  // const { mutate, isPending } = useMutation({
  //   mutationFn: userService.registerService,
  //   onSuccess: () => {},
  //   onError: (err) => {
  //     toast.ERROR(err.message);
  //   },
  // });

  const inintValues = {
    username: "",
    email: "",
    password: "",
    provider: "normal",
    isCheckBox: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Không để trống ô nhập")
      .min(6, "Tên người dùng ít nhất 6 ký tự"),
    email: Yup.string()
      .required("Không để trống ô nhậpl")
      .email("Email không hợp lệ"),
    password: Yup.string()
      .required("Không để trống ô nhập")
      .min(6, "Mật khẩu ít nhất 6 ký tự"),
    isCheckBox: Yup.boolean().oneOf(
      [true],
      "Vui lòng chấp nhận nhận diều khoản",
    ),
  });

  return (
    <Formik
      initialValues={inintValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const { isCheckBox, ...body} = values;
        // mutate(body, {
        //   onSuccess: () => {
        //     toast.SUCCESS("Tạo tài khoản thành công");
        //     resetForm();
        //   },
        // });
      }}
    >
      {({ handleSubmit }) => (
        <Form className="space-y-2" onSubmit={handleSubmit}>
          <AppInputFormik
            name="username"
            label="Tên người dùng"
            placeholder="Nhập tên của bạn"
            iconLeft={<MdOutlineMail className="text-colorGray" size={20} />}
          />

          <AppInputFormik
            type="email"
            name="email"
            label="Email"
            placeholder="example@gmail.com"
            iconLeft={<CgPassword className="text-colorGray" size={20} />}
          />

          <AppInputFormik
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu của bạn"
            iconLeft={<CgPassword className="text-colorGray" size={20} />}
            type="password"
          />

          {/* <AppCheckBoxFormik
            name="isCheckBox"
            label={{ children: "Tôi đồng ý điều khoản" }}
            className="my-3"
          /> */}

          <AppButton
            // disabled={isPending}
            // isLoading={isPending}
            type="submit"
            text={{ children: "Tạo tài khoản", className: "text-[18px]" }}
            style={{ width: "100%" }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormField;
