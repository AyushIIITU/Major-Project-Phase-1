const { generateToken } = require("../../Utils/jwt.js");
const User = require("../Models/User.model.js");
const { format } = require('date-fns');
const UserController={
    registerUser:async (req, res) => {
        try {
          const { name, email, password,leetcode,github } = req.body;
          const existingUser = await User.findOne({ email: email });
          if (existingUser) {
            // console.log("user Already registered");
            return res.status(409).json({ error: "user Already Exists" });
          }
          const newUser = new User({ name, email, password,LeetCodeProfileName:leetcode,GitHubProfileName:github });
          await newUser.save();
          res.status(201).json(newUser);
        } catch (err) {
          console.log("Error in register user:", err);
        }
      },
      loginUser:async (req, res) => {
        try {
          const { email, password } = req.body;
          const existingUser = await User.findOne({ email: email });
          if (!existingUser) {
            return res.status(409).json({ error: "user is not Registered!" });
          }
          const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
          if (!isPasswordCorrect) {
            return res.status(403).json({ error: "Incorrect Password" });
          }
          const payload = {
            email: existingUser.email,
          };
      
          const token = generateToken(payload);
          return res.json({
            token,
            user: existingUser.name,
            id: existingUser._id,
          });
        } catch (err) {
          console.log("Error:", err);
        }
      },
        getUser:async (req, res) => {
            try {
            const data = await User.find();
            // console.log("All user fetched");
            res.status(200).json(data);
            } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
            }
        },
        visitUser: async (req, res) => {
            try {
              const { id } = req.params;
              const currentDate = format(Date.now(), 'd/M/yyyy'); 
              const user = await User.findById(id);
        
              if (!user) {
                return res.status(404).json({ error: "User not found" });
              }
              const heatmapEntry = user.HeatMap.find((entry) => 
                format(entry.date, 'd/M/yyyy') === currentDate
              );
        
              if (heatmapEntry) {
                heatmapEntry.count += 1;
              } else {
                user.HeatMap.push({
                  date: currentDate,
                  count: 1
                });
              }
              await user.save();
        
              return res.status(200).json({ message: 'Heatmap updated successfully' });
            } catch (err) {
              console.error(err);
            }},        

}
module.exports=UserController;