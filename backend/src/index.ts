import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();
app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app











































// import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { decode, verify, sign } from "hono/jwt";

// type Env = {
//   DATABASE_URL: string;
//   JWT_SECRET: string;
// };


// const app = new Hono<{ Bindings: Env }>();

// app.use('/api/v1/blog/*',async(c, next)=>{
//   const token = c.req.header('Authorization')?.split(' ')[1];

// if (!token) {
//     return c.json({ error: 'Unauthorized: No token provided' }, 401)
//   }

//   try{
//     const response = await verify(token,c.env.JWT_SECRET);
//     if(response.id){
//       next();
//     }
  
//   }catch(err : any){
//     return c.json({error : "Unauthorized : invalid token "},401)
//   }
   
// })

// app.post("/api/v1/user/signup", async (c) => {
//   try {
//     const body = await c.req.json<{ email: string; password: string; name: string }>();

//     const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     const user = await prisma.user.create({
//       data: {
//         email: body.email,
//         password: body.password,
//         name: body.name,
//       },
//     });

//     const token = await sign(
//       {userId : user.id,emailId : user.email},
//       c.env.JWT_SECRET||"secrat"
//     );

    

//     return c.json({ message: "User created successfully", token });
//   } catch (err: any) {
//     console.error(err);
//     return c.json({ error: "Failed to create user" }, 500);
//   }
// });


// app.post("/api/v1/user/signin", async(c) => {

//  const body = await c.req.json<{ email: string; password: string }>();


//   try{const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());

//     const user = await prisma.user.findUnique({
//       where :{email :body.email}
//     });

//     if (!user) {
//       return c.json({ error: "Invalid credentials" }, 401);
//     }

//     if (!c.env.JWT_SECRET) {
//       return c.json({ error: "JWT_SECRET not configured" }, 500);
//     }

//     const token = await sign({userId :user.id, email :user.email},c.env.JWT_SECRET)

//     return c.json({message :"sigin successful",token});}
    
//     catch(err:any){
//       console.log("err");
//       return c.json({message : "filed to signin"},500)
//     }
    
// });

// app.post("/api/v1/blog", (c) => {


//   return c.text("blog router");
// });



// app.get("/api/v1/blog/:id", (c) => {
//   const id = c.req.param("id");
//   console.log(id);
//   return c.text("get blog route");
// });



// export default app;
