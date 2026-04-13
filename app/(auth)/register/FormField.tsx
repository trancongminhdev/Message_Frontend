"use client";
import { useToast } from "@/components/AppToast";
import AppButton from "@/components/button/AppButton";
import AppInputFormik from "@/components/input/AppInputFormik";
import { userService } from "@/service/user.service";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { CgPassword } from "react-icons/cg";
import { MdOutlineMail } from "react-icons/md";
import * as Yup from "yup";

const FormField = () => {
  const toast = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: userService.register,
    onSuccess: () => { },
    onError: (err) => {
      toast.ERROR(err.message);
    },
  });

  const inintValues = {
    userName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("Không để trống ô nhập")
      .min(6, "Tên người dùng ít nhất 6 ký tự"),
    email: Yup.string()
      .required("Không để trống ô nhậpl")
      .email("Email không hợp lệ"),
    password: Yup.string()
      .required("Không để trống ô nhập")
      .min(6, "Mật khẩu ít nhất 6 ký tự")
  });

  return (
    <Formik
      initialValues={inintValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        mutate(values, {
          onSuccess: () => {
            toast.SUCCESS("Tạo tài khoản thành công");
            resetForm();
          },
        });
      }}
    >
      {({ handleSubmit }) => (
        <Form className="space-y-2" onSubmit={handleSubmit}>
          <AppInputFormik
            name="userName"
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

          <AppButton
            disabled={isPending}
            isLoading={isPending}
            type="submit"
            text={{ children: "Tạo tài khoản", className: "text-[18px] text-white" }}
            style={{ width: "100%", marginTop: 10 }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormField;
