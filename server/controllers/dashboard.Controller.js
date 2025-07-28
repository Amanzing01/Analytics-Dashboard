import User from '../models/User.js';
import Routine from '../models/Routine.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRoutines = await Routine.countDocuments();
    
    const avgRoutinesPerUser = totalUsers ? (totalRoutines / totalUsers).toFixed(2) : 0;

    const routines = await Routine.find();
    const totalProducts = routines.reduce((sum, r) => sum + r.products.length, 0);
    const avgProductsPerRoutine = routines.length ? (totalProducts / routines.length).toFixed(2) : 0;

    res.json({
      totalUsers,
      totalRoutines,
      avgRoutinesPerUser,
      avgProductsPerRoutine
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGenderDistribution = async (req, res) => {
  try {
    const genders = await User.aggregate([
      { $group: { _id: '$gender', count: { $sum: 1 } } }
    ]);
    res.json(genders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAgeDistribution = async (req, res) => {
  try {
    const users = await User.find();
    const ageGroups = {
      '18–24': 0, '25–32': 0, '33–50': 0, '51–More': 0, 'Unknown': 0
    };

    users.forEach(user => {
      if (!user.age) ageGroups['Unknown']++;
      else if (user.age <= 24) ageGroups['18–24']++;
      else if (user.age <= 32) ageGroups['25–32']++;
      else if (user.age <= 50) ageGroups['33–50']++;
      else ageGroups['51–More']++;
    });

    res.json(ageGroups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSkinTypeDistribution = async (req, res) => {
  try {
    const skinTypes = await User.aggregate([
      { $group: { _id: '$skinType', count: { $sum: 1 } } }
    ]);
    res.json(skinTypes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
