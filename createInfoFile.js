import fs from "fs";
import path from "path";

const createInfoFile = () => {
    const info = {};
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "./package.json"), "utf8"));
    info.version = packageJson.version;
    const infoFilePath = path.join(process.cwd(), "./public/info.json");
    fs.writeFileSync(infoFilePath, JSON.stringify(info, null, 2) + "\n");
};

createInfoFile();