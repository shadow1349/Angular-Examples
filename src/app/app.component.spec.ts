import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let loader: HarnessLoader;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async () => {
    /**
     * Make sure all the same modules are imported that your module
     * is using, otherwise you will get random warnings and failures.
     */
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();

    /**
     * Before each test we will set a new fixture
     * and loader
     */
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  afterEach(async () => {
    /**
     * After each test we need to clear the fixture and loader
     * so that each test gets a new instance of each.
     */
    // @ts-ignore
    fixture = null;
    // @ts-ignore
    loader = null;
  });

  it('should create the app', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`submit method should have been called`, async () => {
    const component = fixture.componentInstance;

    /**
     * We can spy on specific component methods.
     * This allows us to see if those methods have
     * been used later.
     */
    spyOn(component, 'submit');

    /**
     * We can use Angular CDK Harnesses to grab the specific
     * button from our component
     */
    const submitButton = await loader.getHarness(
      MatButtonHarness.with({ selector: '#submitButton' })
    );

    /**
     * Angular gives us a nice way to interact with components
     * just like a user would.
     */
    await submitButton.click();

    /**
     * We should wait for the fixture to become stable before
     * testing if anything happened.
     */
    await fixture.whenStable();

    /**
     * We can expect the component method we're spying on to
     * have been called.
     */
    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(component.myForm.invalid).toBeTrue();
  });

  it(`submit form should be invalid`, async () => {
    const component = fixture.componentInstance;

    const submitButton = await loader.getHarness(
      MatButtonHarness.with({ selector: '#submitButton' })
    );

    await submitButton.click();
    await fixture.whenStable();

    expect(component.myForm.invalid).toBeTrue();
  });

  it(`submit form should be valid`, async () => {
    const component = fixture.componentInstance;

    const submitButton = await loader.getHarness(
      MatButtonHarness.with({ selector: '#submitButton' })
    );

    const testEmail = 'test@test.com';
    const testFirstName = 'John';

    component.myForm.get('email')?.setValue(testEmail);
    component.myForm.get('firstName')?.setValue(testFirstName);

    const emailInput = await loader.getHarness(
      MatInputHarness.with({ selector: '#emailInput' })
    );

    const firstNameInput = await loader.getHarness(
      MatInputHarness.with({ selector: '#firstNameInput' })
    );

    await submitButton.click();
    await fixture.whenStable();

    expect(component.myForm.valid).toBeTrue();
    expect(await emailInput.getValue()).toBe(testEmail);
    expect(await firstNameInput.getValue()).toBe(testFirstName);
  });
});
