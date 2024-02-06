const express = require('express');
const mongoose = require('mongoose');

const batchTransactionSchema = new mongoose.Schema({
  recipients: { type: [String], required: true },
  amounts: { type: [Number], required: true },
  releaseDates: { type: [Number], required: true },
  transactionTypes: { type: [Number], required: true ,  default:56}
});

const BatchTransaction = mongoose.model('BatchTransaction', batchTransactionSchema);

const app = express();

app.use(express.json());

// Connect to MongoDB
const uri = "mongodb+srv://card:HzTkdxg4ibSNdif6@cluster0.mjaabxv.mongodb.net/Transaction";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    
  })
  .catch(err => console.log(err));

// Get all batch transactions
app.get('/batch-transactions', async (req, res) => {
  try {
    const batchTransactions = await BatchTransaction.find();
    res.json(batchTransactions);
  } catch (err) {
    res.status(500,"Sucessfull").json({ message: err.message });
  }
});

// Get a single batch transaction
app.get('/batch-transactions/:id', async (req, res) => {
  try {
    const batchTransaction = await BatchTransaction.findById(req.params.id);
    if (batchTransaction == null) {
      return res.status(404).json({ message: 'Cannot find batch transaction' });
    }
    res.json(batchTransaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new batch transaction
app.post('/batch-transactions', async (req, res) => {
  const batchTransaction = new BatchTransaction({
    recipients: req.body.recipients,
    amounts: req.body.amounts,
    releaseDates: req.body.releaseDates,
    transactionTypes: req.body.transactionTypes
  });

  try {
    const newBatchTransaction = await batchTransaction.save();
    res.status(201).json(newBatchTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a batch transaction
app.patch('/batch-transactions/:id', async (req, res) => {
  try {
    const batchTransaction = await BatchTransaction.findById(req.params.id);
    if (batchTransaction == null) {
      return res.status(404).json({ message: 'Cannot find batch transaction' });
    }

    if (req.body.recipients != null) {
      batchTransaction.recipients = req.body.recipients;
    }

    if (req.body.amounts != null) {
      batchTransaction.amounts = req.body.amounts;
    }

    if (req.body.releaseDates != null) {
      batchTransaction.releaseDates = req.body.releaseDates;
    }

    if (req.body.transactionTypes != null) {
      batchTransaction.transactionTypes = req.body.transactionTypes;
    }

    const updatedBatchTransaction = await batchTransaction.save();
    res.json(updatedBatchTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a batch transaction
app.delete('/batch-transactions/:id', async (req, res) => {
  try {
    const batchTransaction = await BatchTransaction.findById(req.params.id);
    if (batchTransaction == null) {
      return res.status(404).json({ message: 'Cannot find batch transaction' });
    }
    await batchTransaction.remove();
    res.json({ message: 'Deleted batch transaction' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const mongoose = require('mongoose');

// const batchTransactionSchema = new mongoose.Schema({
//   recipients: { type: [String], required: true },
//   amounts: { type: [Number], required: true },
//   releaseDates: { type: [Number], required: true },
//   transactionTypes: { type: [Number], required: true }
// });

// const BatchTransaction = mongoose.model('BatchTransaction', batchTransactionSchema);

// const app = express();

// app.use(express.json());

// // Connect to MongoDB
// const uri = "mongodb+srv://card:HzTkdxg4ibSNdif6@cluster0.mjaabxv.mongodb.net/Transaction";
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(5000, () => console.log('Server running on port 5000'));
//   })
//   .catch(err => console.log(err));

// // Get all batch transactions
// app.get('/batch-transactions', async (req, res) => {
//   try {
//     const batchTransactions = await BatchTransaction.find();
//     res.json(batchTransactions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Get a single batch transaction
// app.get('/batch-transactions/:id', async (req, res) => {
//   try {
//     const batchTransaction = await BatchTransaction.findById(req.params.id);
//     if (batchTransaction == null) {
//       return res.status(404).json({ message: 'Cannot find batch transaction' });
//     }
//     res.json(batchTransaction);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Create a new batch transaction
// app.post('/batch-transactions', async (req, res) => {
//   const batchTransaction = new BatchTransaction({
//     recipients: req.body.recipients,
//     amounts: req.body.amounts,
//     releaseDates: req.body.releaseDates,
//     transactionTypes: req.body.transactionTypes
//   });

//   try {
//     const newBatchTransaction = await batchTransaction.save();
//     res.status(201).json(newBatchTransaction);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Update a batch transaction
// app.patch('/batch-transactions/:id', async (req, res) => {
//   try {
//     const batchTransaction = await BatchTransaction.findById(req.params.id);
//     if (batchTransaction == null) {
//       return res.status(404).json({ message: 'Cannot find batch transaction' });
//     }

//     if (req.body.recipients != null) {
//       batchTransaction.recipients = req.body.recipients;
//     }

//     if (req.body.amounts != null) {
//       batchTransaction.amounts = req.body.amounts;
//     }

//     if (req.body.releaseDates != null) {
//       batchTransaction.releaseDates = req.body.releaseDates;
//     }

//     if (req.body.transactionTypes != null) {
//       batchTransaction.transactionTypes = req.body.transactionTypes;
//     }

//     const updatedBatchTransaction = await batchTransaction.save();
//     res.json(updatedBatchTransaction);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete a batch transaction
// app
