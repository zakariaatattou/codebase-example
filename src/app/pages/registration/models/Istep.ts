interface IFormControl {
    name: string;
    required: boolean;
}

interface IStep {
    title: string;
    description?: string;
    formControls?: any[];
}

interface ISteps {
    individual: IStep[];
    joint: IStep[];
    corporate: IStep[];
}
