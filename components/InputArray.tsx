import { ComponentType, Dispatch, FunctionComponent } from "react";
import { InputDefault } from "../helpers/functionsConfig";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Intent,
  NumericInput,
} from "@blueprintjs/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { InlineMath } from "react-katex";

interface InputArrayDOMType {
  domType: string;
  as: ComponentType<any>;
  validation: Yup.AnySchema<any, any, any>;
}
const type = (input: InputDefault): InputArrayDOMType => {
  if (typeof input.default === "number") {
    return {
      domType: "number",
      as: NumericInput,
      validation: Yup.number().required(),
    };
  }
  if (typeof input.default === "string") {
    return {
      domType: "text",
      as: InputGroup,
      validation: Yup.string().required(),
    };
  }
  return {
    domType: "text",
    as: InputGroup,
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
    <Card
      elevation={Elevation.ONE}
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
                <FormGroup
                  key={i.key}
                  helperText={<ErrorMessage name={i.key} component="div" />}
                  label={i.expr && <InlineMath math={i.expr} />}
                  labelFor={i.key}
                >
                  <Field
                    large={true}
                    intent={Intent.PRIMARY}
                    id={i.key}
                    name={i.key}
                    as={type(i).as}
                    fill={true}
                  />
                </FormGroup>
              );
            })}
            <Button type="submit" disabled={isSubmitting}>
              Надіслати
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export { InputArray };
