import {
  ComponentType,
  Dispatch,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { InputDefault } from "../helpers/functionsType";
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
} from "@chakra-ui/react";

interface InputArrayDOMType {
  domType: string;
  as: ComponentType<any>;
  validation: Yup.AnySchema<any, any, any>;
}
const type = (input: InputDefault): InputArrayDOMType => {
  if (typeof input.default === "number") {
    return {
      domType: "number",
      as: Input,
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

export const createInitialValues = (inputs) => {
  return inputs.reduce((acc, cur) => {
    acc[cur.key] = cur.default;
    return acc;
  }, {});
};

const createShape = (inputs) => {
  return (inputs as Record<string, any>).reduce((acc, cur) => {
    acc[cur.key] = type(cur).validation;
    return acc;
  }, {});
};

const createSchema = (shape) => {
  return Yup.object().shape(shape);
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
  const [initialValues, setInitialValues] = useState(() =>
    createInitialValues(inputs)
  );
  const [shape, setShape] = useState(() => createShape(inputs));
  const [schema, setSchema] = useState(() => createSchema(shape));

  useEffect(() => {
    setInitialValues(createInitialValues(inputs));
  }, [inputs]);

  useEffect(() => {
    setShape(createShape(inputs));
  }, [inputs]);

  useEffect(() => {
    const schema = Yup.object().shape(shape);
    setSchema(createSchema(shape));
  }, [shape]);

  return (
    <Formik
      enableReinitialize={true}
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
  );
};

export { InputArray };
