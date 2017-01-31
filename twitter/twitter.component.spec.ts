import { TestBed } from '@angular/core/testing/test_bed';
import { ComponentFixture } from '@angular/core/testing/component_fixture';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TwitterComponent } from '../twitter/twitter.component';
import { async } from '@angular/core/testing/async';

let comp:    TwitterComponent;
let fixture: ComponentFixture<TwitterComponent>;

/* This won't test element appending done in code */

describe('Component: Twitter', () => {
  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:      [ FormsModule ],
      declarations: [ TwitterComponent ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should exist', () => {
    const twitterContainer = fixture.debugElement.query(By.css('.twitter-container'));
    expect(twitterContainer).toBeDefined();
    expect(twitterContainer).not.toBeNull();
  });
});
