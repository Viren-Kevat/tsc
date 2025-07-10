import generateToken from "../helper/jsonweb";

interface User {
    id: string;
    password?: string;
    [key: string]: any;
}

interface Response {
    status: (code: number) => Response;
    cookie: (name: string, value: string, options: CookieOptions) => Response;
    json: (body: any) => void;
}

interface CookieOptions {
    expires: Date;
    httpOnly: boolean;
    [key: string]: any;
}

const setCookie = (user: User, res: Response): void => {
    const token = generateToken(user.id);
    const options: CookieOptions = {
        expires: new Date(
          Date.now() + 3 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    user.password = undefined;
    res.status(200).cookie("token", token, options).json({
        token,
        success: true,
        user
    });
}

export default setCookie;