export default class ApiConfig {
  private baseUrl: string;

  private regionsPath: string;

  private advisePath: string;

  public constructor(args: {
    baseUrl: string;
    regionsPath: string;
    advisePath: string;
  }) {
    this.baseUrl = args.baseUrl;
    this.regionsPath = args.regionsPath;
    this.advisePath = args.advisePath;
  }

  public getRegionsUrl(): string {
    return `${this.baseUrl}${this.regionsPath}`;
  }

  public getAdviseUrl(): string {
    return `${this.baseUrl}${this.advisePath}`;
  }
}
