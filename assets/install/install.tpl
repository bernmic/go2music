<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Install go2music</title>
    <style>
        h1 {
            text-align: center;
        }
        form {
            /* Just to center the form on the page */
            margin: 0 auto;
            width: 500px;
            /* To see the outline of the form */
            padding: 1em;
            border: 1px solid #CCC;
            border-radius: 1em;
        }

        form div + div {
            margin-top: 1em;
        }

        label {
            /* To make sure that all labels have the same size and are properly aligned */
            display: inline-block;
            width: 200px;
            text-align: right;
        }

        input, textarea, select {
            /* To make sure that all text fields have the same font settings
               By default, textareas have a monospace font */
            font: 1em sans-serif;

            /* To give the same size to all text fields */
            width: 200px;
            box-sizing: border-box;

            /* To harmonize the look & feel of text field border */
            border: 1px solid #999;
        }

        input:focus, textarea:focus {
            /* To give a little highlight on active elements */
            border-color: #000;
        }

        textarea {
            /* To properly align multiline text fields with their labels */
            vertical-align: top;

            /* To give enough room to type some text */
            height: 5em;
        }

        .button {
            /* To position the buttons to the same position of the text fields */
            padding-left: 200px; /* same size as the label elements */
        }

        button {
            /* This extra margin represent roughly the same space as the space
               between the labels and their text fields */
            margin-left: .5em;
        }
    </style>
</head>
<body>
    <form action="/install" method="post">
        <h1>Install go2music</h1>
        <div>
            <label for="databasetype">Database type:</label>
            <select id="databasetype" name="databasetype" autofocus>
                <option value="mysql">MySQL</option>
                <option value="postgres">PostgreSQL</option>
            </select>
        </div>
        <div>
            <label for="databasehost">Database host:</label>
            <input type="text" id="databasehost" name="databasehost" value="{{.DatabaseServer}}">
        </div>
        <div>
            <label for="databaseschema">Database schema:</label>
            <input type="text" id="databaseschema" name="databaseschema" value="{{.DatabaseSchema}}">
        </div>
        <div>
            <label for="databaseuser">Database user:</label>
            <input type="text" id="databaseuser" name="databaseuser" value="{{.DatabaseUser}}">
        </div>
        <div>
            <label for="databasepassword">Database password:</label>
            <input type="password" id="databasepassword" name="databasepassword" value="{{.DatabasePassword}}">
        </div>
        <div>
            <label for="serverport">Server port:</label>
            <input type="text" id="serverport" name="serverport" value="{{.ServerPort}}">
        </div>
        <div>
            <label for="mediapath">Path to music:</label>
            <input type="text" id="mediapath" name="mediapath" value="{{.MediaPath}}">
        </div>
        <div class="button">
            <button type="submit">Start installation</button>
        </div>
    </form>
</body>
</html>