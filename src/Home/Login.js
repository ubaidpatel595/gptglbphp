import "./Css/login.css"
function Login(){
    return(
        <div id="login-form">
        <form action="">
            <table>
                <tr><td>Username:</td>
                    <td><input type="text" name="username" title="username"/></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><input type="text" name="password" title="password"/></td>
                </tr>
            </table>
            <button type="submit" name="login" id="submit-button">Login</button>
        </form>
    </div>
    )
}
export default Login;