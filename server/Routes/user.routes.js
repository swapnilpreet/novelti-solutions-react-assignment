const router = require("express").Router();
const { userModel } = require("../model/user.model");

router.post("/register", async (req, res) => {
  try {
    const { FirstName,
    LastName,
    Email,
    CountryCode,
    Mobile,
    Adress1,
    Adress2,
    ZipCode}= req.body.customerSignUp;
    const Country=req.body.selectedCountry;
    const State=req.body.selectedState;
    const newuser = new userModel({Email,FirstName,
      LastName, CountryCode,
      Mobile,Adress1,
      Adress2,State,Country,ZipCode});
    await newuser.save();
    res.send({
      success: true,
      message: "User saved successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/getuserById/:userId", async (req, res) => {
    try {
      const {userId} = req.params;
      const user = await userModel.findById(userId);
      res.send({
        success: true,
        message: "user fetched successfully",
        data: user,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
});

router.get('/getallusers', async (req,res)=>{
  try {
      const users = await userModel.find();
      res.send({
          success:true,
          message:"user fetch succesfully",
          data:users
      })
  } catch (error) {
      res.send({
          success:false,
          message:error.message,
      })
  }
})

router.put('/edit/user',async(req,res)=>{
  try {
      const {id,
        FirstName,LastName,Email,CountryCode,Mobile,Adress1,Adress2,ZipCode,selectedState,
      selectedCountry
      }= req.body;
      console.log(id,FirstName,LastName,Email,CountryCode,Mobile,Adress1,Adress2,ZipCode,selectedState,
        selectedCountry)
        const User = await userModel.findById(id);
        if(User){
          User.set({
            FirstName,
            LastName,Email,
            CountryCode,
            Mobile,
            Adress1,
            Adress2,
            ZipCode,
            State:selectedState,
            Country:selectedCountry,
          });
          await User.save();
          res.send({
            success:true,
            message:"user Edit succesfully",
        })
        }else{
          res.send({
            success:false,
            message:"user Not Found",
        })
        }
  } catch (error) {
    console.log(error)
  }
})

router.delete('/delete/user/:id',async(req,res)=>{
  try {
     const {id}=req.params;
     console.log(id)
    const user= await userModel.findByIdAndDelete(id);
     res.send({
      success: true,
      message: 'User deleted successfully',
     })
  } catch (error) {
    res.send({
      success:false,
      message:error.message,
    })
  }
})

module.exports = router;
