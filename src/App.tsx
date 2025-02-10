import Button from "@/component/common/button/button"
import Input from "@/component/common/input/input"
import FormInput from "@/component/form/form-input"

function App() {

  return (
    <div className="space-y-4">
      <Button
        color={"primary"}
        size={"lg"}
      >
        Primary
      </Button>
      <Input />
      <FormInput />
    </div>
  )
}

export default App
