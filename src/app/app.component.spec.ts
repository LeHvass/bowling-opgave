import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientTestingModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let http: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClient, HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  /*it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'bowling-opgave'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('bowling-opgave');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('bowling-opgave app is running!');
  });*/

  it('should give 300 score for a perfect game', () => {
    const comp = new AppComponent(http);
    const frames = [[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10,10]];
    expect(comp.calculateScore(frames)).toEqual([30,60,90,120,150,180,210,240,270,300])
  })

  it('should give 290 score for a near-perfect game with a miss on the last roll', () => {
    const comp = new AppComponent();
    const frames = [[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,0],[10,10,0]];
    expect(comp.calculateScore(frames)).toEqual([30,60,90,120,150,180,210,240,270,290])
  })
  
  it('should give 0 score for a game with no hits', () => {
    const comp = new AppComponent();
    const frames = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(comp.calculateScore(frames)).toEqual([0,0,0,0,0,0,0,0,0,0])
  })

  it('should give 0 score for a game with no hits', () => {
    const comp = new AppComponent();
    const frames = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(comp.calculateScore(frames)).toEqual([0,0,0,0,0,0,0,0,0,0])
  })
});
