import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";

const WelcomePage = () => {
  return (
    <Card className="flex justify-end  w-sm h-196 bg-gray-50">
      <CardTitle className="ml-6 text-3xl font-bold">
        <h1>Welcome to PopX</h1>
      </CardTitle>
      <CardContent className="space-y-8 text-gray-500 text-md font-medium">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
          doloremque accusamus eius accusantium enim odio natus excepturi. Dicta
          dolorem temporibus laboriosam!
        </p>
        <div className="space-y-2">
          <div>
            <Link to={"/signup"}>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg">
                Create Account
              </Button>
            </Link>
          </div>

          <div>
            <Link to={"/signin"}>
              <Button
                variant={"default"}
                className="w-full bg-secondary hover:bg-secondary/90 text-black  font-medium py-3 rounded-lg"
              >
                Already Registered? Login
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomePage;
