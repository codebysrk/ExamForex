import Admin from "../model/adminModel.js";

// Controller for handling admin operations
const adminController = {
  loginAdmin: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the admin by username
      const admin = await Admin.findOne({ username });

      // Check if admin exists
      if (!admin) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Check if the provided password matches the admin's password
      if (admin.password !== password) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // If username and password are correct, return success response
      res.status(200).json({ message: "Login successful", admin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Create a new admin
  createAdmin: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const admin = new Admin({ username, email, password });
      await admin.save();
      res.status(201).json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get all admins
  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get admin by ID
  getAdminById: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update admin by ID
  updateAdminById: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const admin = await Admin.findByIdAndUpdate(
        req.params.id,
        { username, email, password },
        { new: true }
      );
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete admin by ID
  deleteAdminById: async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default adminController;
