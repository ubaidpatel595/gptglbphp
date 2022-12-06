function Register(){
    return(
        <div id="login-form">
        <form action="">
            <table>
                <tr>
                    <td>Student: <input type="radio" name="type" id="" value="Reg No" onchange="validate(this)"/></td>
                    <td>Faculty: <input type="radio" name="type" id="" value="Emp Id"onchange="validate(this)"/></td>
                </tr>
                <tr>
                    <td id="user_id">Reg No:</td>
                    <td><input type="text" name="username" title="username"/></td>
                </tr>
                <tr>
                    <td>Full name:</td>
                    <td><input type="text" name="username" title="username"/></td>
                </tr>
                <tr>
                    <td>Mobile:</td>
                    <td><input type="text" name="username" title="username"/></td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td><input type="text" name="username" title="username"/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="text" name="password" title="password"/></td>
                </tr>
            </table>
            <button type="submit" name="login" id="submit-button">Signup</button>
        </form>
    </div>
    )
}
export default Register;