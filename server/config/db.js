import mongoose from "mongoose";

import 'dotenv/config'


const connect = mongoose.connect(process.env.connection);

export default connect;
