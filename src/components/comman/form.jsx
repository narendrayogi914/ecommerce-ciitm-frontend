import React from 'react';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

function Form({ formControls, formData, setFormData, onSubmit, buttonText, disabled }) {
  function renderInputByComponentType(controlItem) {
    let element = null;
    const value = formData[controlItem.name] || '';

    switch (controlItem.componentType) {
      case 'input':
        element = (
          <input
            required
            name={controlItem.name}
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            className="p-2 rounded"
            disabled={disabled} // Disable input based on the disabled prop
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      case 'select':
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [controlItem.name]: value,
              })
            }
            disabled={disabled} // Disable select dropdown
          >
            <SelectTrigger className="w-full">
              <SelectValue>{value || controlItem.placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white font-extrabold text-black">
              {controlItem.options && controlItem.options.length > 0
                ? controlItem.options.map((optionItem) => (
                    <SelectItem
                      className="border-b mb-2"
                      value={optionItem.id}
                      key={optionItem.id}
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case 'textarea':
        element = (
          <Textarea
            required
            name={controlItem.name}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            value={value}
            disabled={disabled} // Disable textarea
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <input
            required
            name={controlItem.name}
            type={controlItem.type}
            placeholder={controlItem.placeholder}
            id={controlItem.name}
            disabled={disabled} // Disable fallback input
            onChange={(event) =>
              setFormData({
                ...formData,
                [controlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button
        className="mt-2 w-full bg-slate-600 hover:bg-slate-600"
        type="submit"
        disabled={disabled} // Disable the submit button
      >
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
}

export default Form;