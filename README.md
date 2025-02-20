Simple-UI-Elements

# Installation and usage

The easiest way to use ui-element is to install it from npm and build it into your app.

```
yarn add simple_ui_elements
npm i simple_ui_elements
pnpm i simple_ui_elements
```

## COMPONENTS

Button

```
  <Button
    color={"primary"} //Change according to your preferences
    size={"md"}
    className="px-40"
  >
    Primary Button
  </Button>

   <Button
      color={"secondary"}
      size={"md"}
      // Add icon options
      startIcon={<Icon className="text-white" />}
      endIcon={<Icon className="text-white" />}
      isLoading //Button loader
    >
      Secondary Button
    </Button>
```

INPUT ELEMENTS

```
  <Input placeholder="This is normal input" />
  <InputTextArea
    placeholder="This is normal input"
  />
  <TimePicker
    onChange={() => { }}
    label={""}
  />
  <ToggleSwitch />
  <Checkbox />
  <Radio />
```

Select
```
 <SingleSelect
    onSelect={() => { }}
    options={[]}
    width="md"
    value={""}
    placeholder="Single select"
  />

  <MultiSelect
    onSelect={() => { }}
    options={[]}
    width="md"
    placeholder="Multi select"
  />
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
      description:"",
      year:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
    }
 })
 return(
  <form onSubmit={formik.handleSubmit}>
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
    <FormTextAreaInput
      id="description"
      placeholder="Enter description here..."
      {...formik.getFieldProps("description")}
      error={formik.errors?.description}
      disabled={isSubmitting}
      label="Description"
      required
    />
    <FormSelect
      name={field.name}
      items={options}
      value={options.find((opt) => opt.value === values.year) || ""}
      onSelect={(option) => setFieldValue("year", option?.value || "")}
      placeholder="Choose an option"
     />
    <Button
      color={"primary"}
      size={"md"}
      type="submit
    >
      Submit
    </Button>
  </form>
 )
}

```

React-hook-form

```
import { useForm, Controller } from "react-hook-form";
import FormInput from "./form/form-input"

//
export function ReactHookForm (){
   const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });
 return(
  <form onSubmit={handleSubmit(()=>{})}>
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
    <FormTextAreaInput
      id="description"
      placeholder="Enter description here..."
      {...register("description")}
      error={errors.description?.message}
      disabled={isSubmitting}
      label="Description"
      required
    />
    <Controller
      name="year"
      control={control}
      render={({ field }) => (
        <FormSelect
          name={field.name}
          items={options}
          value={options.find((opt) => opt.value === field.value) || ""}
          onSelect={(option) => setValue("mySelect", option?.value || "")}
          placeholder="Choose an option"
        />
      )}
    />
    <Button
      color={"primary"}
      size={"md"}
      type="submit
    >
      Submit
    </Button>
  </form>
 )
}

```
