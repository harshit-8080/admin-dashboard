import {
  Layout,
  Card,
  Space,
  Form,
  Input,
  Checkbox,
  Button,
  Flex,
  Alert,
} from "antd";
import { LockFilled, UserOutlined, LockOutlined } from "@ant-design/icons";
import Logo from "../../components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout, self } from "../../http/api";
import { Credentials } from "../../types";
import { useAuthStore } from "../../store";
import { userPermission } from "../../hooks/userPermission";

const loginUser = async (credentials: Credentials) => {
  const { data } = await login(credentials);
  return data;
};

const logoutUser = async () => {
  await logout();
};

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const LoginPage = () => {
  // ^ User Permissions Check
  const { isAllowed } = userPermission();

  const { setUser, logout: logoutFromStore } = useAuthStore();

  // ^ Call GET whoAmI API
  const { refetch } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    enabled: false,
  });

  // ^ Call POST Logout API
  const { mutate: logoutMutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: async () => {
      logoutFromStore();
      return;
    },
  });

  // ^ Call POST Login API
  const {
    mutate: mutateLogin,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: async () => {
      const selfDataPromise = await refetch();

      if (!isAllowed(selfDataPromise.data)) {
        logoutMutate();
      } else {
        setUser(selfDataPromise.data);
      }
    },
  });
  return (
    <>
      <Layout
        style={{ height: "100vh", display: "grid", placeItems: "center" }}
      >
        <Space direction="vertical" align="center" size="large">
          <Layout.Content
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Logo />
          </Layout.Content>
          <Card
            bordered={false}
            style={{ width: 350 }}
            title={
              <Space
                style={{
                  width: "100%",
                  fontSize: 16,
                  justifyContent: "center",
                }}
              >
                <LockFilled></LockFilled>
                Sign in
              </Space>
            }
          >
            <Form
              initialValues={{
                remember: true,
                username: "harshit.new71@gmail.com",
                password: "secret@123",
              }}
              onFinish={(values) => {
                mutateLogin({
                  email: values.username,
                  password: values.password,
                });
              }}
            >
              {isError && (
                <Alert
                  style={{ marginBottom: 24 }}
                  type="error"
                  message={error?.message}
                />
              )}
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                  {
                    type: "email",
                    message: "Email is not valid",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Flex justify="space-between">
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>Remember me </Checkbox>
                </Form.Item>
                <a href="#" id="login-form-forgot">
                  Forgot Password
                </a>
              </Flex>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={isPending}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Space>
      </Layout>
    </>
  );
};

export default LoginPage;
