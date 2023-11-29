var jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        work: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        passwordC: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                }
            }
        ],
        messages: [
            {
                name: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                },
                phone: {
                    type: Number,
                    required: true,
                },
                message: {
                    type: String,
                    required: true,
                },
            }
        ]
    }
)


// We Are generating Token

userSchema.methods.generateToken = async function () {
    try {
        // console.log("Hello");
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        return token;

    } catch (err) {
        console.log(err)
    }
}



userSchema.methods.insertMessage = async function (name, email, phone, message) {
    try {

        // if(this.email !==email){
        //     return null;
        // }

        this.messages = this.messages.concat({ name, email, phone, message })
        await this.save()
        // console.log("before Return");
        return this.messages

    }
    catch (error) {
        console.log(error)
    }
}


const User = mongoose.model('user', userSchema)


module.exports = User;