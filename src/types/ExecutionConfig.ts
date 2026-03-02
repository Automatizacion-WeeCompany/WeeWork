export type TestType = "e2e" | "smoke" | "regression";

export interface BrowserConfig {
    chromium: boolean;
    firefox: boolean;
    webkit: boolean;
}

export interface ExecutionConfig {
    project: string;
    testType: TestType;
    browsers: BrowserConfig;
    headless: boolean;
}
