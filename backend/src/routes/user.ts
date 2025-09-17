
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();



userRouter.post("/signup", async (c) => {
  try {
    const body = await c.req.json<{ email: string; password: string; name: string }>();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign(
      {userId : user.id,emailId : user.email},
      c.env.JWT_SECRET||"secrat"
    );

    

    return c.json({ message: "User created successfully", token });
  } catch (err: any) {
    console.error(err);
    return c.json({ error: "Failed to create user" }, 500);
  }
});


userRouter.post("/signin", async(c) => {

 const body = await c.req.json<{ email: string; password: string }>();


  try{const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where :{email :body.email}
    });

    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    if (!c.env.JWT_SECRET) {
      return c.json({ error: "JWT_SECRET not configured" }, 500);
    }

    const token = await sign({userId :user.id, email :user.email},c.env.JWT_SECRET)

    return c.json({message :"sigin successful",token});}
    
    catch(err:any){
      console.log("err");
      return c.json({message : "filed to signin"},500)
    }
    
});