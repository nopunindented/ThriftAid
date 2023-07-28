const ArrayifyModel = require('../../models/Accept');

const getDeletedPostings = async () => {
  try {
    let deletedPostings = await ArrayifyModel.findOne({});
    if (!deletedPostings) {
      deletedPostings = new ArrayifyModel({ arrayify: [] });
      await deletedPostings.save();
    }
    return deletedPostings;
  } catch (error) {
    console.error('Error getting deleted postings:', error);
    return null;
  }
};

module.exports = getDeletedPostings;
