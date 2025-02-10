import InputTextArea from "@/component/common/input/text-area"
import FormTextAreaInput from "@/component/form/form-text-area"

// 
import Input from "@/component/common/input/input"
import FormInput from "@/component/form/form-input"

// 
import Button from "@/component/common/button/button"

// 
import ToggleSwitch from "@/component/common/switch"
import Checkbox from "@/component/common/checkbox"
import Radio from "@/component/common/radio"
import LoaderIcon from "./assets/icon/loader"
import SingleSelect from "./component/common/select/single-select"
import MultiSelect from "./component/common/select/multi-select"



/**
 * 
 * @returns 
 */
function App() {

  return (
    <div className="space-y-4 w-[900px] mx-auto my-10">
      <div className="flex items-center gap-4">
        <Button
          color={"primary"}
          size={"md"}
        >
          Primary Button
        </Button>
        <Button
          color={"secondary"}
          size={"md"}
          endIcon={<LoaderIcon className="text-white" />}
        >
          Secondary Button
        </Button>
      </div>
      <div className="space-y-4">
        <Input placeholder="This is normal input" />
        <InputTextArea
          placeholder="This is normal input"
        />
        <form>
          <FormInput
            error="This is error" placeholder="This is form input"
            label="Input label"
          />
          <FormTextAreaInput
            error="This is error"
            placeholder="This is form input"
            label="Input label"
          />
          <Button
            color={"primary"}
            size={"md"}
          >
            Submit
          </Button>
        </form>
      </div>
      <div className="flex items-center gap-4">
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
      </div>
      <div className="flex items-center gap-4">
        <ToggleSwitch />
        <Checkbox />
        <Radio />
      </div>
    </div>
  )
}

export default App
