import { ComponentType, Dispatch, FunctionComponent } from "react";
import { InputDefault } from "../helpers/functionsConfig";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InlineMath } from "react-katex";
import {
  Box,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

const InputGroup = (props) => {
  return (
    <NumberInput {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

interface InputArrayDOMType {
  domType: string;
  as: ComponentType<any>;
  validation: Yup.AnySchema<any, any, any>;
}
const type = (input: InputDefault): InputArrayDOMType => {
  if (typeof input.default === "number") {
    return {
      domType: "number",
      as: InputGroup,
      validation: Yup.number().required(),
    };
  }
  if (typeof input.default === "string") {
    return {
      domType: "text",
      as: Input,
      validation: Yup.string().required(),
    };
  }
  return {
    domType: "text",
    as: Input,
    validation: Yup.number().required(),
  };
};

interface InputArrayProps {
  inputs: InputDefault[];
  endpoint: string;
  setPreview: Dispatch<any>;
  setLoading: Dispatch<any>;
}
const InputArray: FunctionComponent<InputArrayProps> = ({
  inputs,
  endpoint,
  setPreview,
  setLoading,
}) => {
  const initialValues = inputs.reduce((acc, cur) => {
    acc[cur.key] = cur.default;
    return acc;
  }, {});
  const shape: Record<string, Yup.AnySchema<any, any, any>> = (inputs as Record<
    string,
    any
  >).reduce((acc, cur) => {
    acc[cur.key] = type(cur).validation;
    return acc;
  }, {});
  const schema = Yup.object().shape(shape);

  return (
    <Box
      padding="6"
      boxShadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      style={{
        height: "max-content",
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          setLoading(true);
          axios
            .post(endpoint, values)
            .then(({ data }) => setPreview(data))
            .finally(() => {
              setSubmitting(false);
              setLoading(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {inputs.map((i) => {
              return (
                <FormControl id={i.key} key={i.key}>
                  {i.expr && (
                    <FormLabel>
                      <InlineMath math={i.expr} />
                    </FormLabel>
                  )}
                  <Field
                    size="lg"
                    id={i.key}
                    name={i.key}
                    as={type(i).as}
                    type={type(i).domType}
                  />
                  <ErrorMessage name={i.key} component={FormHelperText} />
                </FormControl>
              );
            })}
            <Button
              mt={4}
              colorScheme="teal"
              size="lg"
              type="submit"
              disabled={isSubmitting}
            >
              Надіслати
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export { InputArray };
