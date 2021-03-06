import * as Docker from 'dockerode';


class DockerClient {

    private endPoint:Docker;

    constructor() {
        if (process.platform === 'win32') {
            this.endPoint = new Docker({ socketPath: "//./pipe/docker_engine" });
        } else {
            this.endPoint = new Docker({ socketPath: '/var/run/docker.sock' });
        }
    }

    public getContainerDescriptors(): Thenable<Docker.ContainerDesc[]>{
        return new Promise((resolve, reject) => {
            this.endPoint.listContainers((err, containers) => {
                if (err) {
                    return reject(err); 
                }
                return resolve(containers);
            });
        });
    };

    public getImageDescriptors(): Thenable<Docker.ImageDesc[]>{
        return new Promise((resolve, reject) => {
            this.endPoint.listImages((err, images) => {
                if (err) {
                    return reject(err); 
                }
                return resolve(images);
            });
        });
    };

    public getContainer(id: string): Docker.Container {
        return this.endPoint.getContainer(id);
    }

    public getImage(id:string): Docker.Image {
        return this.endPoint.getImage(id);
    }
}

export const docker = new DockerClient();