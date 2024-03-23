import { Button, Flex, Form, Input, InputNumber, Typography } from "antd";
import "./App.css";
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormItem } from "react-hook-form-antd";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  password: string;
  confirmPassword: string;
};

function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(20),
      lastName: z.string().min(2).max(20),
      email: z.string().email(),
      age: z.number().min(18).max(70),
      password: z.string().min(5).max(10),
      confirmPassword: z.string().min(5).max(10),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log("Submitted", data);
  };

  return (
    <>
      <Flex
        vertical={true}
        justify="center"
        align="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography.Title level={3}>Sign Up</Typography.Title>
        <Form onFinish={handleSubmit(submitData)}>
          <FormItem control={control} name={"firstName"}>
            <Input placeholder="Enter your fistname" />
          </FormItem>
          <FormItem control={control} name={"lastName"}>
            <Input placeholder="Enter your lastname" />
          </FormItem>

          <FormItem control={control} name={"email"}>
            <Input type="email" placeholder="Enter your email" />
          </FormItem>

          <FormItem control={control} name={"age"}>
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter your age"
            />
          </FormItem>

          <FormItem control={control} name={"password"}>
            <Input.Password placeholder="Enter your password" />
          </FormItem>

          <FormItem control={control} name={"confirmPassword"}>
            <Input.Password placeholder="Confirm your password" />
          </FormItem>

          <Form.Item>
            <Button style={{ width: "100%" }} htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
}

export default App;
