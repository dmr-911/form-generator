# **DynamicForm Component Documentation**

## **Overview**

The `DynamicForm` component is a versatile and reusable form component that can be used to create dynamic forms with various input fields, validation, and submission handling. It is designed to be highly customizable and can be used to create complex forms with ease.

The `DynamicForm` component gives you some handled features:

- `Grid View` : The form will be a grid system . Where 4 devices are currently available.

For Form :

```tsx
    grid : 2 / 4 / 6 /12 (You can specify your own, with the grid data there will be that much columns)
```

For Input:

```tsx

                widths: {
                  default: '100%',
                  greaterThan1440: '100%',
                  between890And1440: '100%',
                  between600And890: '100%'
                },
```

Final Data of a simple form :

```tsx
    const formData = [
        {
            step : 1,
            name : 'Step One',
            slug : 'step-one',
            form : {
                // Here will be the solo form
            },
        }
    ]

        <DynamicForm formData={formData}>
        <Button
            type="submit"
            // className="w-full col-span-2 bg-primary leading-6 text-white font-medium bg-gray-700"
            className="col-span-full"
            color="success"
        >
            Submit
        </Button>
        </DynamicForm>
```

- `Solo Form` : When using solo form, It's quite simple to use. Just pass the data, and see what happens 😊

- `Stepper Form` : Same process, but stepper form data should be an array of solo forms, where you should define the slug of steps, name of steps etc.
  Example :

  ```tsx
  import Form from '@src/components/stepperForm/Form';
  const formData = [
    {
      step: 1,
      name: 'Step One',
      slug: 'step-one',
      form: {
        // Here will be the solo form
      }
    },
    {
      step: 2,
      name: 'Step Two',
      slug: 'step-two',
      form: {
        // Here will be the solo form
      }
    }
  ];

  const DynamicStepperForm = ({ data, step }: any) => {
    if (!data) return <div>No data</div>;
    return <Form step={step} data={data} />;
  };
  ```

- `Error Handling` : The system autmatically handles and give the input components errors if any error rises.
- `Validation` : System has the built in validation support for every type of data. But there are some exceptions. `When` we were researching about dynamic validation, we can not declare type for any input (`Ex`: string, number, boolean) as type is passing to identify `Inputs`. Then we have given the input data an extra field property to validate.

  ```tsx
          validation: {
          type: 'string',
          validations: {
            matches: {
              regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
              message: 'Invalid Email'
            },
          minLength : {  value: 10,
            message: 'Description must be at least 10 characters long'
          },
          maxLength: {
            value: 150,
            message: 'Description must be at most 50 characters long'
          }
          }
        }
  ```

- `Handled Submitting Values` : You can decide how form and data will behave after submitting. (`EX:` Save values to browser storages, Hit any API with any methods)

- `Default Values` : Instead of generating initial values , you can give your own default values to the form. It can be handful when anyone wants to edit any form with default values.

- `Support for Repeaters` : Allows dynamic addition or removal of repeating fields, useful for forms with variable-length inputs (e.g., multiple addresses or phone numbers). `Example Data : `

  ```tsx
  {
  name: 'Member Info',
  grid: 2,
  submit: {
      store: 'localStorage', // local Storage, session Storage, cookies
      key_name: 'name-form',
      endPoint: '/name-form',
      method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
  },
  items : [
          {
        index: 7,
        widths: {
          default: '100%',
          greaterThan1440: '100%',
          between890And1440: '100%',
          between600And890: '100%'
        },
        name: 'friends',
        label: 'Friends',
        required: true,
        tag: 'repeater',
        placeholder: 'friend',
        form: {
          name: 'Nested Test',
          grid: 4,
          items: [
            {
              index: 3,
              widths: {
                default: '100%',
                greaterThan1440: '100%',
                between890And1440: '100%',
                between600And890: '100%'
              },

              size: 'md',
              color: 'default',
              shape: 'smooth',
              type: 'number',
              id: 'age',
              label: 'Friend age',
              name: 'f_age',
              placeholder: 'write your friend age',
              required: true,
              validation: {
                type: 'number',
                validations: {
                  min: {
                    value: 18,
                    message: 'Friend age should be at least 18'
                  },
                  max: {
                    value: 65,
                    message: 'Friend age should be less than 65'
                  }
                }
              }
            },
            {
              index: 2,
              widths: {
                default: '100%',
                greaterThan1440: '100%',
                between890And1440: '100%',
                between600And890: '100%'
              },

              size: 'md',
              color: 'default',
              shape: 'smooth',
              type: 'text',
              id: 'name',
              label: 'Friend Name',
              name: 'f_name',
              placeholder: 'write your friend name',
              required: true,
              validation: {
                type: 'string',
                validations: {
                  minLength: {
                    value: 5,
                    message: 'Friend name should be at least 5 characters long'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Friend name should be less than 20 characters long'
                  }
                }
              }
            },
            {
              index: 7,
              widths: {
                default: '100%',
                greaterThan1440: '100%',
                between890And1440: '100%',
                between600And890: '100%'
              },
              name: 'friends',
              label: 'Friends',
              required: true,
              tag: 'repeater',
              placeholder: 'friend',
              form: {
                name: 'Nested Test',
                grid: 4,
                items: [
                  {
                    index: 3,
                    widths: {
                      default: '100%',
                      greaterThan1440: '100%',
                      between890And1440: '100%',
                      between600And890: '100%'
                    },

                    size: 'md',
                    color: 'default',
                    shape: 'smooth',
                    type: 'number',
                    id: 'age',
                    label: 'Friend age',
                    name: 'f_age',
                    placeholder: 'write your friend age',
                    required: true,
                    validation: {
                      type: 'number',
                      validations: {
                        min: {
                          value: 18,
                          message: 'Friend age should be at least 18'
                        },
                        max: {
                          value: 65,
                          message: 'Friend age should be less than 65'
                        }
                      }
                    }
                  },
                  {
                    index: 2,
                    widths: {
                      default: '100%',
                      greaterThan1440: '100%',
                      between890And1440: '100%',
                      between600And890: '100%'
                    },

                    size: 'md',
                    color: 'default',
                    shape: 'smooth',
                    type: 'text',
                    id: 'name',
                    label: 'Friend Name',
                    name: 'f_name',
                    placeholder: 'write your friend name',
                    required: true,
                    validation: {
                      type: 'string',
                      validations: {
                        minLength: {
                          value: 5,
                          message: 'Friend name should be at least 5 characters long'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Friend name should be less than 20 characters long'
                        }
                      }
                    }
                  },
                  {
                    index: 7,
                    widths: {
                      default: '100%',
                      greaterThan1440: '100%',
                      between890And1440: '100%',
                      between600And890: '100%'
                    },
                    name: 'friends',
                    label: 'Friends',
                    required: true,
                    tag: 'repeater',
                    placeholder: 'friend',
                    form: {
                      name: 'Nested Test',
                      grid: 4,
                      items: [
                        {
                          index: 3,
                          widths: {
                            default: '100%',
                            greaterThan1440: '100%',
                            between890And1440: '100%',
                            between600And890: '100%'
                          },

                          size: 'md',
                          color: 'default',
                          shape: 'smooth',
                          type: 'number',
                          id: 'age',
                          label: 'Friend age',
                          name: 'f_age',
                          placeholder: 'write your friend age',
                          required: true,
                          validation: {
                            type: 'number',
                            validations: {
                              min: {
                                value: 18,
                                message: 'Friend age should be at least 18'
                              },
                              max: {
                                value: 65,
                                message: 'Friend age should be less than 65'
                              }
                            }
                          }
                        },
                        {
                          index: 2,
                          widths: {
                            default: '100%',
                            greaterThan1440: '100%',
                            between890And1440: '100%',
                            between600And890: '100%'
                          },

                          size: 'md',
                          color: 'default',
                          shape: 'smooth',
                          type: 'text',
                          id: 'name',
                          label: 'Friend Name',
                          name: 'f_name',
                          placeholder: 'write your friend name',
                          required: true,
                          validation: {
                            type: 'string',
                            validations: {
                              minLength: {
                                value: 5,
                                message: 'Friend name should be at least 5 characters long'
                              },
                              maxLength: {
                                value: 20,
                                message: 'Friend name should be less than 20 characters long'
                              }
                            }
                          }
                        },
                        {
                          index: 7,
                          widths: {
                            default: '100%',
                            greaterThan1440: '100%',
                            between890And1440: '100%',
                            between600And890: '100%'
                          },
                          name: 'friends',
                          label: 'Friends',
                          required: true,
                          tag: 'repeater',
                          placeholder: 'friend',
                          form: {
                            name: 'Nested Test',
                            grid: 4,
                            items: [
                              {
                                index: 3,
                                widths: {
                                  default: '100%',
                                  greaterThan1440: '100%',
                                  between890And1440: '100%',
                                  between600And890: '100%'
                                },

                                size: 'md',
                                color: 'default',
                                shape: 'smooth',
                                type: 'number',
                                id: 'age',
                                label: 'Friend age',
                                name: 'f_age',
                                placeholder: 'write your friend age',
                                required: true,
                                validation: {
                                  type: 'number',
                                  validations: {
                                    min: {
                                      value: 18,
                                      message: 'Friend age should be at least 18'
                                    },
                                    max: {
                                      value: 65,
                                      message: 'Friend age should be less than 65'
                                    }
                                  }
                                }
                              },
                              {
                                index: 2,
                                widths: {
                                  default: '100%',
                                  greaterThan1440: '100%',
                                  between890And1440: '100%',
                                  between600And890: '100%'
                                },

                                size: 'md',
                                color: 'default',
                                shape: 'smooth',
                                type: 'text',
                                id: 'name',
                                label: 'Friend Name',
                                name: 'f_name',
                                placeholder: 'write your friend name',
                                required: true,
                                validation: {
                                  type: 'string',
                                  validations: {
                                    minLength: {
                                      value: 5,
                                      message: 'Friend name should be at least 5 characters long'
                                    },
                                    maxLength: {
                                      value: 20,
                                      message:
                                        'Friend name should be less than 20 characters long'
                                    }
                                  }
                                }
                              }
                            ]
                          },
                          validation: {
                            type: 'array',
                            validations: {}
                          }
                        }
                      ]
                    },
                    validation: {
                      type: 'array',
                      validations: {}
                    }
                  }
                ]
              },
              validation: {
                type: 'array',
                validations: {}
              }
            }
          ]
        },
        validation: {
          type: 'array',
          validations: {}
        }
      },]}
  ```

- `Support for groups (objects)` : Enables grouping of related fields under a single object, allowing for nested data structures within the form. (`Coming soon`)

- `Support for custom components` : Provides flexibility to integrate custom React components into the form, giving you control over specific input behaviors or UI.

- `Support for non input fields and Blank Step` : Allows inclusion of informational content or blank steps in a form for guidance, instructions, or layout adjustments without requiring user input. `Example data : `
  ```tsx
        {
      index: 1,
      widths: {
        default: '100%',
        greaterThan1440: '100%',
        between890And1440: '100%',
        between600And890: '100%'
      },
      type: 'HTML',
      children: (
        <div className="text-xs leading-5">
          <Link
            href="/forget-password"
            className="font-sans font-medium text-primary-600 underline-offset-4 transition duration-150 ease-in-out hover:text-primary-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      )
    }
  ```

## **Props**

The `DynamicForm` component accepts the following props:

- `formData`: An object containing the form data, including field names, labels, and validation rules.
- `className`: A string representing the CSS class name to be applied to the form container.
- `children`: A React node representing the form fields and other child components.
- `store`: A string representing the storage mechanism to use for storing form data (e.g., "localStorage", "sessionStorage", or "cookies").
- `set_data_to_browser_store`: A boolean indicating whether to store form data in the browser's storage.
- `send_data_to_external_api`: A boolean indicating whether to send form data to an external API.
- `endPoint`: A string representing the API endpoint URL.
- `onSubmit`: A function to be called when the form is submitted.
- `defaultValue`: An object containing default values for the form fields.
- `method`: A string representing the HTTP method to use for submitting the form (e.g., "INSERT", "UPSERT", "DELETE", or "UPDATE").
- `key_name`: A string representing the key name to use for storing form data in the browser's storage.
- `allValues`: An object containing all the form field values.

## **Children Components**

The `DynamicForm` component can have the following child components type:

- `textarea`: A textarea input field.
- `number`: A number input field.
- `checkbox`: A checkbox input field.
- `button`: A button component.
- `password`: A password input field.
- `select`: A select input field.
- `signature`: A signature panel component.
- `radio-group`: A radio group component.
- `text`: A text input field.
- `checkbox-group`: A checkbox group component.
- `phone`: A phone input field.
- `file`: A file handler component.

## **Example Usage**

Here is an example of using the `DynamicForm` component:

```tsx
import React from 'react';
import { DynamicForm } from '@src/components/DynamicForm';

const formData = {
  name: 'Member Info',
  grid: 2,
  submit: {
    store: 'localStorage', // local Storage, session Storage, cookies
    key_name: 'name-form',
    endPoint: '/name-form',
    method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
  },
  items: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      validation: {
        //.... some validations
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validation: {
        //.... some validations
      }
    }
  ]
};

const MyForm = () => {
  return (
    <DynamicForm formData={formData}>
      <Button type="submit">Submit</Button>
    </DynamicForm>
  );
};
```

In this example, we define a `formData` object that contains two fields: `username` and `password`. We then create a `MyForm` component that uses the `DynamicForm` component and passes the `formData` object as a prop. We also define an `onSubmit` function that will be called when the form is submitted. Finally, we render the form fields and a submit button inside the `DynamicForm` component.

## **Validation**

The `DynamicForm` component supports validation out of the box. You can define validation rules for each field in the `formData` object. For example:

```tsx
const formData = {
  fields: [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      required: true,
      validation: {
        type: 'string',
        validations: {
          matches: {
            regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
            message: 'Invalid Email'
          },
          minLength: { value: 10, message: 'Description must be at least 10 characters long' },
          maxLength: {
            value: 150,
            message: 'Description must be at most 50 characters long'
          }
        }
      }
    }
  ]
};
```

In this example, we define a `username` field with a validation rule that requires the field to be at least 3 characters long and no more than 20 characters long.

## **Submission Handling**

The `DynamicForm` component supports submission handling out of the box. You can define an `onSubmit` function that will be called when the form is submitted. For example:

```tsx
const formData = {
  name: 'Member Info',
  grid: 2,
  submit: {
    store: 'localStorage', // local Storage, session Storage, cookies
    key_name: 'name-form',
    endPoint: '/name-form',
    method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
  },
  items: [
    // items
  ]
};
```

## **Storage**

The `DynamicForm` component supports storage out of the box. You can define a storage mechanism to use for storing form data. For example:

```tsx
const formData = {
  name: 'Member Info',
  grid: 2,
  submit: {
    store: 'localStorage', // local Storage, session Storage, cookies
    key_name: 'name-form'
  },
  items: [
    // items
  ]
};
```

In this example, we define a `storage` property that specifies that we want to store the form data in the browser's local storage.

## **API Submission**

The `DynamicForm` component supports API submission out of the box. You can define an API endpoint URL and a method to use for submitting the form data. For example:

```tsx
const formData = {
  name: 'Member Info',
  grid: 2,
  submit: {
    endPoint: '/name-form',
    method: 'UPDATE' // INSERT, UPSERT, DELETE, UPDATE
  },
  items: [
    // items
  ]
};
```

In this example, we define an `endPoint` property that specifies the API endpoint URL and a `method` property that specifies the HTTP method to use for submitting the form data.

Now we have a overview about how we pass data on Dynamic form.

# Describing the Component and Utilities

It looks like you're working on a dynamic form with complex logic that includes conditional rendering, calculation handling, and managing field arrays. Based on the code you've shared, you're integrating several features like field dependency checks, form submission handling, dynamic validation schema generation, responsive item widths, and repeater fields.

Here are a few points to consider or improve:

1. **Conditional Field Rendering (`depends`)**:
   - You’ve implemented logic to handle conditional visibility based on field dependencies. Ensure that the conditions (`AND`, `OR`) and operators (like `eq`, `gt`, etc.) are flexible for nested rules, which you already seem to be handling well.
2. **Calculation Logic**:

   - The calculation logic works by iterating over the specified fields and applying the given operator. You can improve this by adding a fallback in case a field value is undefined (e.g., handle cases where a required field is missing).

3. **Validation Schema**:

   - You are generating validation schemas dynamically based on form item configurations. This is helpful in forms where the fields and their validation requirements change based on user input or external data. Ensure your `generateValidationSchema` function is optimized to handle changes efficiently.

4. **Field Array Management**:

   - For your repeater fields, you're handling adding/removing items via `handleAddFieldArrayItem` and `handleRemoveFieldArrayItem`. This allows dynamic form sections to grow/shrink based on user interaction, which is good for complex forms like surveys or questionnaires.
   - However, if there’s a need to add multiple types of items to the same array, consider using a more generalized approach where items of different structures can be added dynamically.

5. **Responsive Design (Widths)**:

   - You are calculating widths for each item based on screen size. It would be helpful to test across different screen sizes to ensure the form maintains a user-friendly layout on both small and large screens.

6. **Form Submission**:

   - You handle form submission by checking whether to submit data to an API or store locally. Ensure that `storeOrSendValueToApi` handles edge cases, such as network failures or permission issues when storing data locally.

7. **Repeater Fields (`renderRepeaterField`)**:

   - Your `renderRepeaterField` function dynamically renders a field array based on a predefined template. Ensure that the repeater items have unique keys (in case `index` changes) to avoid React reconciliation issues. Also, check that fields within the repeater can be conditionally shown/hidden and recalculated as needed.

8. **Optimization**:
   - The `useEffect` handling form item updates (`updateFormItems`) could potentially become expensive if the form has many items. You may want to memoize some of the calculations, especially for large forms with many dependencies and dynamic validations.

If you're facing specific issues or need help with optimizing any part of this form, feel free to ask!

## check dependency of fields (checkDependency.ts)

1. Handling Nested Fields: Your getFieldValue function correctly handles nested fields. The split and reduce methods are a good choice for this.

2. Condition Evaluation: The evaluateRule function evaluates conditions based on the operator, which is flexible and extendable.

3. Default Values: The default values for index and allValues are set, which is good practice.
