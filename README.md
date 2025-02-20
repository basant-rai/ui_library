Simple-UI-Elements

# Installation and usage

The easiest way to use ui-element is to install it from npm and build it into your app.

```
yarn add simple_ui_elements
npm i simple_ui_elements
pnpm i simple_ui_elements
```

## Features
✅ Easy integration with `react-hook-form` and `formik`
✅ Fully TypeScript supported  
✅ Custom validation support  
✅ Lightweight and performant  

FORMIK
```
import { useFormik } from "formik";
import FormInput from "./form/form-input"

//
export function FormikForm (){
 const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
    },
 })
 return(
  <form>
    <FormInput
      id="email"
      type="email"
      placeholder="m@example.com"
      {...formik.getFieldProps("email")}
      error={
        formik.touched.email && formik.errors.email
          ? formik.errors.email
          : undefined
      }
      disabled={formik.isSubmitting}
      label="Email"
      required
    />
  </form>
 )
}

```

React-hook-form

```
import { useForm } from "react-hook-form";
import FormInput from "./form/form-input"

//
export function ReactHookForm (){
   const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
 return(
  <form>
      <FormInput
        id="email"
        type="email"
        placeholder="m@example.com"
        {...register("email")}
        error={errors.email?.message}
        disabled={isSubmitting}
        label="Email"
        required
      />
  </form>
 )
}

```