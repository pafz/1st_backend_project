const { Company } = require('../models/index');

const CompanyController = {
  async createCompany(req, res) {
    try {
      const company = await Company.create(req.body);
      res.status(201).send({ msg: 'Company created successfully', company });
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = CompanyController;
